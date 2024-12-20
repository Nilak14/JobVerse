import axios from "axios";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
export class JVRequest {
  static get = async (url: string) => {
    return axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          return { data: res.data.data, err: null, status: res.status };
        } else if (res.status === 201) {
          return { data: res.data.data, err: null, status: res.status };
        }
      })
      .catch(async (e) => {
        const data = e.response.data;
        if (e.response.status === 401) {
          toast.error(data.message);
        } else if (e.response.status === 403) {
          toast.error(data.message);
          await signOut();
        } else {
          toast.error("Something went wrong");
        }
      });
  };
}
