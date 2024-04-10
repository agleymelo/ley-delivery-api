/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { verifyJWT } from '../../../middlewares/verify-jwt'
import { verifyUserRole } from '../../../middlewares/verify-user-role'
import { deleteProduct } from './delete-product'
import { updatePhotoProduct } from './update-photo-product'
import { updateProduct } from './update-product'
import { MULTER } from '../../../../config/upload'

const upload = multer(MULTER)

export async function productAdminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.addHook('onRequest', verifyUserRole('admin'))

  app.put('/:productId', updateProduct)
  app.delete('/:productId', deleteProduct)

  app.patch(
    '/:productId/photo',
    { preHandler: upload.single('photo') },
    updatePhotoProduct,
  )
}
