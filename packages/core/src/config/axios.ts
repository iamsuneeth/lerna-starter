import axios from "axios";
import * as InterFaceConstants from "../constants/interface_constants";

export const Request = axios.create({
    timeout: InterFaceConstants.API_TIMEOUT,
    headers: {
        Authorization: `Bearer ${InterFaceConstants.API_KEY}`,
    },
});
