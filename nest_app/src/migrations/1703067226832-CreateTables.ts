import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1703067226832 implements MigrationInterface {
    name = 'CreateTables1703067226832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`manaCost\` varchar(255) NULL, \`colorIdentity\` json NULL, \`type\` varchar(255) NULL, \`rarity\` varchar(255) NULL, \`setName\` varchar(255) NULL, \`text\` longtext NULL, \`flavor\` varchar(255) NULL, \`power\` varchar(255) NULL, \`toughness\` varchar(255) NULL, \`imageUrl\` varchar(255) NULL, \`isFavorite\` tinyint(1) NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`extensions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NULL, \`setName\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`extensions\``);
        await queryRunner.query(`DROP TABLE \`cards\``);
    }

}
