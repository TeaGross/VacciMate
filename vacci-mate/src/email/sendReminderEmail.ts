import emailjs from '@emailjs/browser';
import { formatDate } from '../utils/formatDate';

export function sendReminderEmail(reminder: {
    email: string;
    vaccineName: string;
    remindAt: string;
    }) {
    console.log('📨 sendReminderEmail CALLED', reminder);

    return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
        email: reminder.email,
        vaccine_name: reminder.vaccineName,
        remind_at: formatDate(reminder.remindAt),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
    );
}
