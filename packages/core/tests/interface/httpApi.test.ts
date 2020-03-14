import { HttpAPI } from "../../src/interface/httpApi";
import { Request } from "../../src/config/axios";

Request.get = jest.fn();

describe("Http Api", () => {
    beforeEach(() => {
        (Request.get as jest.Mock).mockRestore();
    });
    it("should return transformed value", async () => {
        const testResponse = {
            data: "something",
            status: 200,
        };

        (Request.get as jest.Mock).mockResolvedValue(testResponse);
        const http = HttpAPI.getInstance();
        const response = await http.get("");
        expect(response).toEqual(testResponse);
    });

    it("should return error", async () => {
        const testError = {
            response: {
                data: {
                    error: {
                        code: "error_code",
                        message: "error_message",
                    },
                },
                status: 400,
            },
        };
        (Request.get as jest.Mock).mockRejectedValue(testError);
        const http = HttpAPI.getInstance();
        try {
            const response = await http.get("");
            expect(response).toThrow();
        } catch (error) {
            expect(error).toEqual({
                code: "error_code",
                message: "error_message",
            });
        }
    });
    test("should form correct URL", async () => {
        const testResponse = {
            data: "something",
            status: 200,
        };

        (Request.get as jest.Mock).mockResolvedValue(testResponse);
        const http = HttpAPI.getInstance();
        await http.get("url/{movieId}", {
            params: {
                movieId: 1234,
            },
        });
        expect((Request.get as jest.Mock).mock.calls[0][0]).toBe("url/1234");
    });
});
