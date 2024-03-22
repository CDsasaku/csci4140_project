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
  Login: { share_id: string };
  Register: undefined;
  EmailVerification: {isEdit: boolean};
  ForgetPassword: undefined;
  ResetPassword: { user_id: number; passcode: string };
  HomeBottomBarNavigation: undefined;

  //profile
  Profile: undefined;

  //notification
  Notification: undefined;

  //stack
  ProfileStack: undefined;
  NotificationStack: undefined;
};

export type { RootProps, RootStackParamList };