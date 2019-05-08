import React from 'react';

export default function Device({ id, name, device, path, status }) {
  let text = status.slice(0, 1).toUpperCase() + status.slice(1, status.length);

  return (
    <div>
      <div
        className="device-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <p>{id}</p>
        <p>{name}</p>
        <p>{device}</p>
        <p>{path}</p>
        {text === 'Available' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: 'lime',
                borderRadius: '50%',
                alignSelf: 'center'
              }}
            />

            <p>{text}</p>
          </div>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
}
