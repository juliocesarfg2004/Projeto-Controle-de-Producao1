import prisma from '../api/config/db.js';
import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sistema.com';
const ADMIN_SENHA = process.env.ADMIN_SENHA || 'admin123';
const ADMIN_NOME = process.env.ADMIN_NOME || 'Administrador';

async function main() {
  const existing = await prisma.usuario.findUnique({
    where: { login: ADMIN_EMAIL }
  });

  if (existing) {
    if (existing.tipo !== 'admin') {
      await prisma.usuario.update({
        where: { login: ADMIN_EMAIL },
        data: { tipo: 'admin' }
      });
      console.log(`Usuário ${ADMIN_EMAIL} promovido a admin.`);
    } else {
      console.log(`Admin ${ADMIN_EMAIL} já existe.`);
    }
    return;
  }

  const senha = await bcrypt.hash(ADMIN_SENHA, BCRYPT_ROUNDS);
  await prisma.usuario.create({
    data: {
      nome: ADMIN_NOME,
      login: ADMIN_EMAIL,
      senha,
      tipo: 'admin',
      atualizado_em: new Date()
    }
  });
  console.log(`Admin ${ADMIN_EMAIL} criado com sucesso.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
