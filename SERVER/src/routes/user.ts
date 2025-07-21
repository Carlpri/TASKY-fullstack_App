import { Router } from 'express';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
import prisma from '../lib/prisma';
import cloudinary from '../lib/cloudinary';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Get current user details
router.get('/', async (req: any, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        emailAddress: true,
        avatar: true,
        dateJoined: true,
        lastProfileUpdate: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
});

router.patch('/', [
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
  body('username').optional().trim().notEmpty().withMessage('Username cannot be empty'),
  body('emailAddress').optional().isEmail().withMessage('Valid email is required')
], async (req: any, res:any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const userId = req.user.id;
    const { firstName, lastName, username, emailAddress } = req.body;

    if (username || emailAddress) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            ...(username ? [{ username }] : []),
            ...(emailAddress ? [{ emailAddress }] : [])
          ],
          NOT: { id: userId }
        }
      });

      if (existingUser) {
        return res.status(400).json({
          message: 'Username or email already exists'
        });
      }
    }

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (username) updateData.username = username;
    if (emailAddress) updateData.emailAddress = emailAddress;
    
    updateData.lastProfileUpdate = new Date();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        emailAddress: true,
        avatar: true,
        dateJoined: true,
        lastProfileUpdate: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

router.post('/avatar', upload.single('avatar'), async (req: any, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user.id;

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true }
    });

    if (currentUser?.avatar && currentUser.avatar !== '') {
    
      const publicId = currentUser.avatar.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting old avatar:', error);
        }
      }
    }

    
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'tasky-avatars',
          transformation: [
            { width: 400, height: 400, crop: 'fill' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const avatarUrl = (result as any).secure_url;

   
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: avatarUrl,
        lastProfileUpdate: new Date()
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        emailAddress: true,
        avatar: true,
        dateJoined: true,
        lastProfileUpdate: true
      }
    });

    res.json({
      message: 'Avatar uploaded successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
});

router.delete('/avatar', async (req: any, res) => {
  try {
    const userId = req.user.id;

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true }
    });

    if (currentUser?.avatar && currentUser.avatar !== '') {
     
      const publicId = currentUser.avatar.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting avatar from Cloudinary:', error);
        }
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: '',
        lastProfileUpdate: new Date()
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        emailAddress: true,
        avatar: true,
        dateJoined: true,
        lastProfileUpdate: true
      }
    });

    res.json({
      message: 'Avatar removed successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Avatar removal error:', error);
    res.status(500).json({ message: 'Failed to remove avatar' });
  }
});

export default router; 