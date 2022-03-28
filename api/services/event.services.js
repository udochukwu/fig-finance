import Event from '../model/event.model';


export async function fetchEvents(query) {
  try {
    const { search, isVirtual, category } = query;

    let params = {};
    const and = [];
    if (typeof isVirtual !== 'undefined' && isVirtual.toLowerCase() !== 'all') {
      and.push({ isVirtual });
    }

    if (category && category.toLowerCase() !== 'all') {
      and.push({ category });
    }
    if (search) {
      and.push({
        $or: [
          { title: { $regex: '.*' + search.trim() + '.*', $options: 'i' } },
          { city: { $regex: '.*' + search.trim() + '.*', $options: 'i' } },
        ],
      });
    }

    if (and.length > 0) {
      params = {
        $and: and,
      };
    }

    const events = await Event.find(params);
    return events;
  } catch (error) {
    throw new Error(error);
  }
}
