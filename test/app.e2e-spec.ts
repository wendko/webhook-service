import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { NotificationType, NotificationLog, NotificationTypeSchema, NotificationLogSchema } from './notification.model';
// import DbModule from './db.service';
import { NotificationService } from 'src/notification/notification.service';
import { SubscriptionService } from 'src/subscription/subscription.service';

// const testUser = {
//     email: 'test@test.com',
//     firstName: 'earrieta',
//     lastName: 'dev',
// };

// const wait = time => new Promise(resolve => setTimeout(() => resolve(time), time));

// describe('NotificationService', () => {
//     let service: NotificationService;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             imports: [
//                 DbModule(),
//                 // TypeOrmModule.forFeature([
//                 //     NotificationTypeSchema, NotificationLogSchema
//                 // ]),
//             ],
//             providers: [
//                 NotificationService, SubscriptionService
//             ],
//         }).compile();

//         service = module.get<NotificationService>(NotificationService);
//     });

//     it('should be defined', () => {
//         expect(service).toBeDefined();
//     });

// });