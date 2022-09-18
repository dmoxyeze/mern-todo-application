export class QueryHelper {
  query: any;
  queryString: any;
  queryExludedFields: Array<string> = ["page", "sort", "limit", "fields"];
  page: Number = 1;
  limit: Number = 20;
  constructor(query: object, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Filtering Objects
    const queryObj: any = { ...this.queryString };
    const excludedFields = this.queryExludedFields;
    excludedFields.forEach((item) => delete queryObj[item]);

    // Advanced filtering
    // turn the query object into string
    let queryString = JSON.stringify(queryObj);
    // replace keywords with appropriate formatting to avoid mongo errors
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );
    // turn it back into an object
    let formatted = JSON.parse(queryString);
    // formatted the queries to use regex instead of exact match
    for (let key in formatted) {
      formatted[key] = { $regex: formatted[key], $options: "i" };
    }
    this.query.find(formatted);
    return this;
  }

  sort() {
    // sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }

    return this;
  }

  async paginate() {
    const page = Number(this.queryString.page) * 1 || this.page;
    const limit: Number = Number(this.queryString.limit) * 1 || this.limit;
    const skip = (Number(page) - 1) * Number(limit);
    if (this.queryString.page) {
      const numProps = await this.query.countDocuments();
      if (skip >= numProps) throw new Error("The page does not exist!");
    }
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
