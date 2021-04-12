import { refresh } from "./instance";
import qs from "qs";

interface responseType {
  access_token: string;
  refresh_token: string;
}

export const getAccessToken = async () => {
  await refresh
        .post<responseType>(
          "oauth/token",
          qs.stringify({
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refresh_token"),
          })
        )
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
        })
        .catch(() => {
          alert("다시 로그인 해주세요.");
        });
};
