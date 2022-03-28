import { fetchEvents } from '../services/event.services';

class EventController {
  static async getAllEvents(req, res, next) {
    try {
      const events = await fetchEvents(req.query);
      return res.status(200).json({ events });
    } catch (error) {
      next(error);
    }
  }
}
export default EventController;
