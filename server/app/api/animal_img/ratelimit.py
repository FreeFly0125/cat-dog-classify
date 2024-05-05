import time


class RateLimiter:
    def __init__(self) -> None:
        self.past_req_timestamp = 0

    def check_request_rate(self) -> bool:
        current_time = time.time()

        if current_time - self.past_req_timestamp >= 60:
            self.past_req_timestamp = current_time
            return True
        else:
            return False


rateLimiter = RateLimiter()
