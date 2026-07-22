import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API da Loja virtual",
      version: "1.0.0",
      description: "Documentação da API da Loja virtual implementada durante o Web Academy.",
    },
    servers: [{
      // Usando a porta 4444 direto ou a variável de ambiente, sem precisar do validateEnv
      url: `http://localhost:${process.env.PORT || 4444}/v1`,
    }],
    components: {
      schemas: {} // Aqui você pode colocar os seus schemas de CreateProduct, etc, se for usar
    },
  },
  // O Swagger vai varrer todos os seus arquivos .router.ts automaticamente
  apis: ["./src/resources/**/*.router.ts"],
});

export default swaggerSpec;