export interface Customer {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    addresses?: Address[];
    dateOfBirth: string;
    defaultShippingAddressId: string;
    defaultBillingAddressId: string;
}

interface Address {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
    id: string;
}

const projectKey = import.meta.env.VITE_PROJECT_KEY;

export async function updateCustomerPersonalData(
  token: string,
  data: { firstName: string; lastName: string; email: string; dateOfBirth: string }
): Promise<void> {
    const getResponse = await fetch(`https://api.europe-west1.gcp.commercetools.com/${projectKey}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!getResponse.ok) {
    throw new Error('Не удалось получить данные пользователя');
  }

  const customerData = await getResponse.json();
  const currentVersion = customerData.version;
  const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/${projectKey}/me`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: currentVersion,
      actions: [
        { action: 'setFirstName', firstName: data.firstName },
        { action: 'setLastName', lastName: data.lastName },
        { action: 'setDateOfBirth', dateOfBirth: data.dateOfBirth },
        { action: 'changeEmail', email: data.email },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();

      if (
        errorBody?.message === 'There is already an existing customer with the provided email.'
      ) {
    throw new Error('duplicate_email');
  }
    throw new Error('Не удалось обновить пользователя');
  }
}

export async function getCurrentCustomer(token: string): Promise<Customer> {
    function isCustomer(data: unknown): data is Customer {
        return typeof data === 'object' && data !== null && 'id' in data && 'email' in data;
    }

    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/${projectKey}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Не удалось получить данные пользователя');
    }

    const raw: unknown = await response.json();

    if (!isCustomer(raw)) {
        throw new Error('Invalid response shape');
    }

    return raw;
}
