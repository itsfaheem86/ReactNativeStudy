import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization: `Bearer 9VXS9klbM4ST0oVYhJmF43lOTyOMgvBIZBS1R6IZ7OwhZl48JyTOtPrOjqAWUoPmCrxamJ-cAYgIHVw0pMLng1ZHVG6fMLBan5CL5JGDzpIpzQ6IpBhvqpx8Dnl2YHYx`,
  },
});
