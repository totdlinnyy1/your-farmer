import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ErrorField = {
  __typename?: 'ErrorField';
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  product: Product;
  updateProduct: Product;
  deleteProduct: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateProductArgs = {
  options: ProductInput;
};


export type MutationProductArgs = {
  productId: Scalars['Int'];
};


export type MutationUpdateProductArgs = {
  coast: Scalars['Int'];
  productId: Scalars['Int'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  label: Scalars['String'];
  coast: Scalars['Int'];
  value: Scalars['String'];
  class: Scalars['String'];
  amount: Scalars['String'];
  productImage?: Maybe<Scalars['String']>;
  ownerId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProductInput = {
  label: Scalars['String'];
  coast: Scalars['Int'];
  amount: Scalars['String'];
  class: Scalars['String'];
  value: Scalars['String'];
  productImage?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  myProducts: Array<Product>;
  me?: Maybe<User>;
};

export type RegisterInput = {
  name: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  number: Scalars['String'];
  role: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  lastname: Scalars['String'];
  number: Scalars['String'];
  role: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorField>>;
  user?: Maybe<User>;
};

export type CreateProductMutationVariables = Exact<{
  label: Scalars['String'];
  amount: Scalars['String'];
  coast: Scalars['Int'];
  class: Scalars['String'];
  value: Scalars['String'];
  productImage?: Maybe<Scalars['String']>;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'label' | 'id' | 'ownerId' | 'coast' | 'amount' | 'class' | 'value'>
  ) }
);

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'lastname' | 'email' | 'role' | 'number' | 'avatarUrl'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ProductMutationVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type ProductMutation = (
  { __typename?: 'Mutation' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'label' | 'amount' | 'coast'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  number: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'lastname' | 'email' | 'role' | 'number' | 'avatarUrl'>
    )> }
  ) }
);

export type UpdateProductMutationVariables = Exact<{
  productId: Scalars['Int'];
  coast: Scalars['Int'];
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'coast'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name' | 'lastname' | 'number' | 'avatarUrl' | 'role'>
  )> }
);

export type MyProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProductsQuery = (
  { __typename?: 'Query' }
  & { myProducts: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'label' | 'coast' | 'amount' | 'value' | 'class' | 'productImage'>
  )> }
);


export const CreateProductDocument = gql`
    mutation CreateProduct($label: String!, $amount: String!, $coast: Int!, $class: String!, $value: String!, $productImage: String) {
  createProduct(
    options: {label: $label, amount: $amount, coast: $coast, class: $class, value: $value, productImage: $productImage}
  ) {
    label
    id
    ownerId
    coast
    amount
    class
    value
  }
}
    `;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($productId: Int!) {
  deleteProduct(productId: $productId)
}
    `;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    errors {
      message
    }
    user {
      id
      name
      lastname
      email
      role
      number
      avatarUrl
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ProductDocument = gql`
    mutation Product($productId: Int!) {
  product(productId: $productId) {
    label
    amount
    coast
  }
}
    `;

export function useProductMutation() {
  return Urql.useMutation<ProductMutation, ProductMutationVariables>(ProductDocument);
};
export const RegisterDocument = gql`
    mutation Register($name: String!, $lastname: String!, $email: String!, $role: String!, $number: String!, $password: String!) {
  register(
    options: {name: $name, lastname: $lastname, email: $email, role: $role, number: $number, password: $password}
  ) {
    errors {
      message
    }
    user {
      id
      name
      lastname
      email
      role
      number
      avatarUrl
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateProductDocument = gql`
    mutation UpdateProduct($productId: Int!, $coast: Int!) {
  updateProduct(productId: $productId, coast: $coast) {
    id
    coast
  }
}
    `;

export function useUpdateProductMutation() {
  return Urql.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    name
    lastname
    number
    avatarUrl
    role
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyProductsDocument = gql`
    query MyProducts {
  myProducts {
    id
    label
    coast
    amount
    value
    class
    productImage
  }
}
    `;

export function useMyProductsQuery(options: Omit<Urql.UseQueryArgs<MyProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyProductsQuery>({ query: MyProductsDocument, ...options });
};