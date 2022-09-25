import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "../../../components/cart/CartItem";
import { ShoppingCartProvider } from "../../../contexts/ShoppingCartContext";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

describe("CartItem", () => {
  it("renders a product", () => {
    global.fetch = jest.fn(() => {});

    const product = {
      id: "id",
      name: "name",
      price: 12,
      imageSrc: "image",
    };
    const quantity = 3;

    render(
      <ShoppingCartProvider>
        <CartItem product={product} quantity={quantity} />
      </ShoppingCartProvider>
    );

    const title = screen.getByText(product.name);
    const quantityElement = screen.getByText(`Qty ${quantity}`);

    expect(title).toBeInTheDocument();

    expect(quantityElement).toBeInTheDocument();
  });

  it("removes the item from the cart", () => {
    global.fetch = jest.fn(() => {});
    global.localStorage = new LocalStorageMock();
    localStorage.setItem("cart", JSON.stringify([{ id: "id", quantity: 1 }]));

    const product = {
      id: "id",
      name: "name",
      price: 12,
      imageSrc: "image",
    };
    render(
      <ShoppingCartProvider>
        <CartItem product={product} quantity={3} />
      </ShoppingCartProvider>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([]);
  });

  it("calls the removeCart API", () => {
    const mockFetch = jest.fn(() => {});
    global.fetch = mockFetch;

    const product = {
      id: "id",
      name: "name",
      price: 12,
      imageSrc: "image",
    };
    render(
      <ShoppingCartProvider>
        <CartItem product={product} quantity={3} />
      </ShoppingCartProvider>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockFetch).toBeCalled();
  });
});
