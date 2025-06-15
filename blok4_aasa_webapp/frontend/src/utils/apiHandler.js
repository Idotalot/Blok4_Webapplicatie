// hooks/apiHandler.js

export const sendApiData = async (url, data, onSuccess, onError) => {
    try {
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Wachten op ontvangen data
      const responseData = await response.json();
      onSuccess(responseData);
    } catch (error) {
      if (onError) onError(error);
    }
};
  