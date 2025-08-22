export const errorHandler = (error: Error) => {
  console.error('Error:', error);
  
  return Response.json(
    { 
      success: false, 
      error: error.message || 'Internal Server Error' 
    },
    { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};

export const notFound = () => {
  return Response.json(
    { 
      success: false, 
      error: 'Route not found' 
    },
    { 
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};