-- CreateTable
CREATE TABLE `Cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategoria` (
    `id_subcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_subcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(191) NOT NULL,
    `fabricante` VARCHAR(191) NOT NULL,
    `preco_base` DOUBLE NOT NULL,
    `quantidade_disponivel` INTEGER NOT NULL,
    `subcategoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Numero_Serie` (
    `id_numero_serie` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_serie` VARCHAR(191) NOT NULL,
    `produtoId` INTEGER NOT NULL,

    UNIQUE INDEX `Numero_Serie_numero_serie_key`(`numero_serie`),
    PRIMARY KEY (`id_numero_serie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `desconto_aplicado` DOUBLE NULL,
    `forma_pagamento` VARCHAR(191) NOT NULL,
    `total_compra` DOUBLE NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `enderecoId` INTEGER NOT NULL,

    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Compra` (
    `compraId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco_unitario` DOUBLE NOT NULL,

    PRIMARY KEY (`compraId`, `produtoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategoria` ADD CONSTRAINT `Subcategoria_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_subcategoriaId_fkey` FOREIGN KEY (`subcategoriaId`) REFERENCES `Subcategoria`(`id_subcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Numero_Serie` ADD CONSTRAINT `Numero_Serie_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Compra` ADD CONSTRAINT `Item_Compra_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `Compra`(`id_compra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Compra` ADD CONSTRAINT `Item_Compra_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;
