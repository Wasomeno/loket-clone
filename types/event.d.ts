export type EventType = {
  id?: number;
  banner_image?: string;
  title?: string;
  place?: string;
  description?: string;
  min_ticket_price?: number;
  creator_id?: number;
  category_id?: number;
  region_id?: number;
  date_time_start?: Date;
  date_time_end?: Date;
  category?: Pick<EventCategory, "id" | "name">;
  creator?: string;
  region?: string;
  ticket_types: EventTicketDetails[];
};

export type EventCategory = {
  id: number;
  name: string;
  image_logo: string;
  image_banner: string;
  description: string;
  events: [];
};

export type EventTicketDetails = {
  id?: number;
  name?: string;
  amount?: number;
  price?: number;
  description?: string;
  event_id?: number;
  sale_end?: Date;
  sale_start?: Date;
  event?: EventType;
};

export type EventCreator = {
  id?: number;
  name: string;
  image_logo: string;
  image_banner: string;
  address: string;
  description: string;
  user_id: int;
  events_created?: EventType[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  event_creator_id: number;
  event_creator: EventCreator;
};
