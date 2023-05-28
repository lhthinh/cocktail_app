import { Request } from 'express'
import { diskStorage } from 'multer'

export const avatarUpload = {
  limits: {
    fileSize: Math.pow(1024, 2) * 20,
  },
  storage: diskStorage({
    destination: './files/avatar',
    filename: (req: Request, avatar: Express.Multer.File, cb: any) => {
      console.log(12312321)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${uniqueSuffix}_${avatar.originalname}`)
    },
  }),
}

export const ingredientUpload = {
  limits: {
    fileSize: Math.pow(1024, 2) * 20,
  },
  storage: diskStorage({
    destination: './files/ingredient',
    filename: (req: Request, avatar: Express.Multer.File, cb: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${uniqueSuffix}_${avatar.originalname}`)
    },
  }),
}

export const productUpload = {
  limits: {
    fileSize: Math.pow(1024, 2) * 20,
  },
  storage: diskStorage({
    destination: './files/product',
    filename: (req: Request, avatar: Express.Multer.File, cb: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${uniqueSuffix}_${avatar.originalname}`)
    },
  }),
}
