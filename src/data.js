export const data = {
  status: 200,
  message: "OK",
  response: [
    {
      categoryId: 1,
      category: "Retail",
      status: "ACTIVE",
      propertySubCategories: [
        {
          subCategoryId: 1,
          subCategory: "Bank",
          categoryId: 1,
          status: "ACTIVE",
        },
        {
          subCategoryId: 2,
          subCategory: "Daycare",
          categoryId: 1,
          status: "ACTIVE",
        },
        {
          subCategoryId: 3,
          subCategory: "Nursery",
          categoryId: 1,
          status: "ACTIVE",
        },
      ],
    },
    {
      categoryId: 2,
      category: "Office Space",
      status: "ACTIVE",
      propertySubCategories: [
        {
          subCategoryId: 4,
          subCategory: "Executive Office",
          categoryId: 2,
          status: "ACTIVE",
        },
        {
          subCategoryId: 5,
          subCategory: "Medical Office",
          categoryId: 2,
          status: "ACTIVE",
        },
        {
          subCategoryId: 6,
          subCategory: "Traditional Office",
          categoryId: 2,
          status: "ACTIVE",
        },
      ],
    },
  ],
};
