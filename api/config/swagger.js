import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Controle de Produção',
      version: '1.0.0',
      description: 'API para gerenciamento de controle de produção',
      contact: {
        name: 'Suporte',
        email: 'juliocesarfg2004@gmail.com'
      }
    },
    servers: [
      {
        url: '/',
        description: 'Servidor atual'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            usuario_id: { type: 'integer', description: 'ID do usuário' },
            nome: { type: 'string', description: 'Nome do usuário' },
            login: { type: 'string', description: 'Email de login' },
            senha: { type: 'string', description: 'Senha (não retornada nas listagens)' },
            atualizado_em: { type: 'string', format: 'date-time', description: 'Data da última atualização' },
            atualizado_por: { type: 'integer', description: 'ID do usuário que atualizou' }
          }
        },
        ProdutoTipo: {
          type: 'object',
          properties: {
            material_tipo_id: { type: 'integer', description: 'ID do tipo' },
            descricao: { type: 'string', description: 'Descrição do tipo' },
            produtos: {
              type: 'array',
              items: { $ref: '#/components/schemas/Produto' },
              description: 'Produtos deste tipo'
            }
          }
        },
        Produto: {
          type: 'object',
          properties: {
            produto_id: { type: 'integer', description: 'ID do produto' },
            descricao: { type: 'string', description: 'Descrição do produto' },
            produto_tipo_id: { type: 'integer', description: 'ID do tipo de produto' },
            estoque: { type: 'integer', description: 'Quantidade em estoque' },
            atualizado_em: { type: 'string', format: 'date-time', description: 'Data da última atualização' },
            atualizado_por: { type: 'integer', description: 'ID do usuário que atualizou' },
            tipo: { $ref: '#/components/schemas/ProdutoTipo', description: 'Tipo do produto' }
          }
        },
        OrdemProducao: {
          type: 'object',
          properties: {
            ordem_producao_id: { type: 'integer', description: 'ID da ordem de produção' },
            produto_id: { type: 'integer', description: 'ID do produto' },
            data: { type: 'string', format: 'date', description: 'Data da ordem' },
            quantidade: { type: 'integer', description: 'Quantidade a produzir' },
            progresso: { type: 'integer', description: 'Progresso em porcentagem (0-100)' },
            atualizado_em: { type: 'string', format: 'date-time', description: 'Data da última atualização' },
            atualizado_por: { type: 'integer', description: 'ID do usuário que atualizou' },
            produto: { $ref: '#/components/schemas/Produto', description: 'Produto associado' }
          }
        }
      }
    }
  },
  apis: ['./api/routes/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);
