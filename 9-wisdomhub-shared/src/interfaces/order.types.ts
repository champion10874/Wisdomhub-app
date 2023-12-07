export type TOffer = {
  [key: string]: string | number | boolean | undefined;
  gigTitle: string;
  price: number;
  description: string;
  deliveryInDays: number;
  oldDeliveryDate: string;
  newDeliveryDate: string;
  accepted: boolean;
  cancelled: boolean;
  reason?: string;
}

export type TExtendedDelivery = {
  originalDate: string;
  newDate: string;
  days: number;
  reason: string;
  deliveryDateUpdate?: string;
}

export type TDeliveredWork = {
  message: string;
  file: string;
  fileType: string;
  fileSize: number;
  fileName: string;
}

export type TOrderEvents = {
  placeOrder: string;
  requirements: string;
  orderStarted: string;
  deliveryDateUpdate?: string;
  orderDelivered?: string;
  buyerReview?: string;
  sellerReview?: string;
}

export type TOrderReview = {
  rating: number;
  review: string;
  date?: string;
}

export type TOrderMessage = {
  sellerId?: string;
  buyerId?: string;
  ongoingJobs?: number;
  completedJobs?: number;
  totalEarnings?: number;
  purchasedGigs?: string;
  recentDelivery?: string;
  type?: string;
  receiverEmail?: string;
  username?: string;
  template?: string;
  sender?: string;
  offerLink?: string;
  amount?: string;
  buyerUsername?: string;
  sellerUsername?: string;
  title?: string;
  description?: string;
  deliveryDays?: string;
  orderId?: string;
  invoiceId?: string;
  orderDue?: string;
  requirements?: string;
  orderUrl?: string;
  originalDate?: string;
  newDate?: string;
  reason?: string;
  subject?: string;
  header?: string;
  total?: string;
  message?: string;
  serviceFee?: string;
}

export type TOrderDocument = {
  offer: TOffer;
  gigId: string;
  sellerId: string;
  sellerUsername: string;
  sellerImage: string;
  sellerEmail: string;
  gigCoverImage: string;
  gigMainTitle: string;
  gigBasicTitle: string;
  gigBasicDescription: string;
  buyerId: string;
  buyerUsername: string;
  buyerEmail: string;
  buyerImage: string;
  status: string;
  orderId: string;
  invoiceId: string;
  quantity: number;
  price: number;
  requestExtension?: TExtendedDelivery;
  serviceFee?: number;
  requirements?: string;
  approved?: boolean;
  cancelled?: boolean;
  delivered?: boolean;
  approvedAt?: string;
  deliveredWork?: TDeliveredWork[];
  dateOrdered?: string;
  events: TOrderEvents;
  buyerReview?: TOrderReview;
  sellerReview?: TOrderReview;
  paymentIntent?: string;
}

export type TOrderNotification = {
  _id?: string;
  userTo: string;
  senderUsername: string;
  senderPicture: string;
  receiverUsername: string;
  receiverPicture: string;
  isRead?: boolean;
  orderId: string;
  type?: string;
  message: string;
  rating?: number;
  createdAt: Date;
}
