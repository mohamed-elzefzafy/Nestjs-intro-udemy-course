import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export async function dropDatabase(config: ConfigService): Promise<void> {
    const appDataSource = new DataSource({
      type: 'postgres',
      synchronize: config.get('database.synchronize'),
      port: +config.get('database.port'),
      username: config.get('database.username'),
      password: config.get('database.password'),
      host: config.get('database.host'),
      database: config.get('database.name'),
    });
  
    // Ensure the data source is initialized before using it
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }
  
    // Drop the database and destroy the connection
    await appDataSource.dropDatabase();
    await appDataSource.destroy();
  }
  
