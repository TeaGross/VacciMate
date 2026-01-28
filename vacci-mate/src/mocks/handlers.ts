import { http, HttpResponse } from 'msw';
import type { Reminder } from '../models/Reminder';
import { sendReminderEmail } from '../email/sendReminderEmail';

export const handlers = [

    // create reminder
    http.post('/api/reminders', async ({ request }) => {
        const body = (await request.json()) as Reminder;

        sendReminderEmail(body);

        return HttpResponse.json(
        {
            success: true,
            message: 'Reminder scheduled',
        },
        { status: 200 }
        );
    }),
];
