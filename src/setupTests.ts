import "@testing-library/jest-dom/extend-expect";

// global mock of JavaScript fetch method
(global.fetch as jest.Mock) = jest.fn(() => ({
    json: () => Promise.resolve({}),
}));
