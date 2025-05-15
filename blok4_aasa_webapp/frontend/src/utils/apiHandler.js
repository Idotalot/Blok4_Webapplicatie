// hooks/apiHandler.js

export const sendApiData = async (url, data, onSuccess, onError) => {
    try {
      const response = await fetch(url , {
        method: 'POST',  // Only POST method is supported
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Wait for responseData
      const responseData = await response.json();
      onSuccess(responseData);
    } catch (error) {
      if (onError) onError(error);
    }
};
  