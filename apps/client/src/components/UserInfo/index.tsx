import { Permission } from "common";
import { capitalize } from "utils";

interface UserInfoProps {
  name: string;
  permission: keyof typeof Permission;
  email: string;
  phone: string;
}

export default function UserInfo(userInfo: UserInfoProps) {
  return (
    <div className="flex flex-col">
      {...Object.entries(userInfo).map(([key, value]) => (
        <span key={key} className="whitespace-nowrap">
          <span className="font-bold">{capitalize(key)}: </span>
          {value}
        </span>
      ))}
    </div>
  );
}
