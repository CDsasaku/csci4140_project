import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

type ScreenNavigationProp<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

type RootProps<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

type RootStackParamList = {
  //auth
  Login: undefined;
  Register: undefined;
  EmailVerification: {isEdit: boolean};
  ForgetPassword: undefined;
  ResetPassword: { uid: number; passcode: string };
  HomeBottomBarNavigation: undefined;

  //home
  Home: undefined;
  ItemDetail: { itemId: number};
  AddOrEditItem: { isEdit: boolean};
  CheckRequest: { itemId: number };
  RequestDetail: { itemId: number; requestId: number };
  Request: { itemId: number };

  //conversation
  Message: undefined;
  Chatroom: { conversationId: number };

  //notification
  Notification: undefined;

  //profile
  Profile: undefined;

  //stack
  HomeStack: undefined;
  MessageStack: undefined;
  NotificationStack: undefined;
  ProfileStack: undefined;
};

export type { RootProps, RootStackParamList };