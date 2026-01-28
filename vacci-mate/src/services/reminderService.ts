import type { Reminder } from '../models/Reminder';
import { sendReminderEmail } from '../email/sendReminderEmail';

export const createReminder = async (
    reminder: Reminder
    ): Promise<Reminder> => {
    try {
        await sendReminderEmail({
            email: reminder.email,
            vaccineName: reminder.vaccineName,
            remindAt: reminder.remindAt,
        });
    } catch (error) {
        console.error('Fel vid mejl-sändning:', error);
        throw new Error('Kunde inte skicka påminnelse-mejl');
    }

    return reminder;
};
