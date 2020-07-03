import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionController } from './subscription/subscription.controller';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionModule } from './subscription/subscription.module';

describe('AppController', () => {
    let controller: SubscriptionController;
    let service;

    const mockSubService = {
        test: () => "123",
        // findAll: () => (['test']),
    };

    const subServiceProvider = {
        provide: SubscriptionService,
        useValue: mockSubService,
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [SubscriptionController],
            providers: [subServiceProvider],
        }).compile();

        controller = app.get<SubscriptionController>(SubscriptionController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(controller.test()).toBe('123');
        });
    });
});
