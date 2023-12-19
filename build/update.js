"use strict";
/**
 * 处理新OTA包操作
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// 根据请求头中的信息确定文件保存位置
function determineSavePath(headers) {
    if (headers['content-type'] === 'image/jpeg') {
        return 'uploads/images';
    }
    else if (headers['content-type'] === 'application/pdf') {
        return 'uploads/documents';
    }
    else {
        return 'uploads/others';
    }
}
// 为上传的文件生成新的文件名
function generateFilename(file) {
    return "update.tar.gz";
}
// 配置 multer 中间件
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const savePath = determineSavePath(req.headers);
        cb(null, savePath);
    },
    filename: (req, file, cb) => {
        const filename = generateFilename(file);
        cb(null, filename);
    },
});
exports.upload = (0, multer_1.default)({ storage });
