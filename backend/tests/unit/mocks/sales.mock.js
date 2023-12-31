const salesMock = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: '2023-05-29T16:36:25.000Z',
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: '2023-06-29T16:36:25.000Z',
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: '2023-06-29T16:36:25.000Z',
    },
  ];

  const salesByIdMock = [
    {
      productId: 1,
      quantity: 5,
      date: '2023-06-29T16:36:25.000Z',
    },
    {
      productId: 2,
      quantity: 10,
      date: '2023-06-29T16:36:25.000Z',
    },
  ];

  const registerSaleOutputMock = [
    {
      productId: 1,
      quantity: 1,
    },
  ];

  const registerErrorMockProductId = [
    {
      product: 1,
      quantity: 1,
    },
  ];

  const registerSaleInputMock = {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
    ],
  };

  module.exports = {
    salesMock,
    salesByIdMock,
    registerSaleOutputMock,
    registerSaleInputMock,
    registerErrorMockProductId,
  };