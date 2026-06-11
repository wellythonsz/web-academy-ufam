import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logger = (formato: 'simples' | 'completo') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataHora = new Date().toISOString();
    let mensagemLog = '';

    if (formato === 'completo') {
      mensagemLog = `[${dataHora}] ${req.method} ${req.url} - IP: ${req.ip}\n`;
    } else {
      mensagemLog = `[${dataHora}] ${req.method} ${req.url}\n`;
    }

    const pastaLogs = process.env.LOG_DIR || 'logs';
    const caminhoPasta = path.join(process.cwd(), pastaLogs);
    const caminhoArquivo = path.join(caminhoPasta, 'access.log');

    try {
      if (!fs.existsSync(caminhoPasta)) {
        fs.mkdirSync(caminhoPasta, { recursive: true });
      }
      fs.appendFile(caminhoArquivo, mensagemLog, (err) => {
        if (err) console.error('Erro ao salvar log:', err);
      });
    } catch (erro) {
      console.error('Erro ao acessar pasta de logs:', erro);
    }

    next();
  };
};

export default logger;