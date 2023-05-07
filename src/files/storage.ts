import { diskStorage } from 'multer';
import { FileEntity } from './entities/file.entity';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const generateName = (req, file, callback) => {
  const extensionName = file.originalname.split('.').pop();

  callback(null, `${generateId()}.${extensionName}`);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: generateName,
});
