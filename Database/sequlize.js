import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: "postgres",
    logging: false,
  }
);

// Модель для таблицы "Запросы на скачивание"
const DownloadRequest = sequelize.define("DownloadRequest", {
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telegramId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Модель для "Таблица пользователей"
const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  downloadsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("base", "admin", "VIP"),
    allowNull: false,
    defaultValue: "base",
  },
  registrationTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Модель для "Таблица транзакций"
const Transaction = sequelize.define("Transaction", {
  purchaseTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "userId",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subscriptionDuration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "Срок приобретения в днях",
  },
});

// Связи между таблицами
User.hasMany(DownloadRequest, { foreignKey: "userId" });
DownloadRequest.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

// Синхронизация с базой данных и создание таблиц, если их нет
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("All tables have been synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to synchronize tables:", err);
  });

// Экспорт моделей для использования в других модулях
export { DownloadRequest, User, Transaction, sequelize };
