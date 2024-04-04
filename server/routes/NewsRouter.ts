import express from "express";
import { addNewPost, deletePost, editPost, getAllNews, getOnePost } from "../controllers/NewsController";
import { newsValidationRules } from "../validators/NewsValidator";
import { verifyToken } from "../middlewares/HandleVerifyToken";

const router = express.Router()//estamos invocado el enrutador

router.get('/', getAllNews);

router.delete('/:id', verifyToken, deletePost);

router.post('/post', verifyToken, newsValidationRules, addNewPost); ///verifyRole('admin')

router.put('/:id', verifyToken, newsValidationRules, editPost);

router.get('/:id', getOnePost);

export default router;

//middleware para verificar el token primero,luego middleware para verificar roles si es 