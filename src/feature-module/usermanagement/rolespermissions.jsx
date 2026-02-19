import React, { useState, useEffect } from "react";
import { fetchAdmins } from "../Api/UserApi";

const RolesPermissions = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      setIsLoading(true);
      const response = await fetchAdmins(pagination.current, pagination.pageSize);
      const userData = response.payload || [];
      const adminUsers = userData.filter(user =>
        user.userRoleDto?.userRole === "ADMIN"
      );

      const transformedData = adminUsers.map(user => ({
        id: user.id,
        username: `${user.firstName} ${user.lastName}`,
        email: user.emailAddress,
        status: user.isActive ? 'Active' : 'Inactive',
        userRoleDto: {
          userRole: user.userRoleDto?.userRole || ''
        },
        mobileNumber: user.mobileNumber,
      }));

      setUsersData(transformedData);
      setPagination(prev => ({
        ...prev,
        total: transformedData.length
      }));
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [pagination.current, pagination.pageSize]);

  if (isLoading) {
    return <div className="page-wrapper">{/* Add loading spinner or message here if desired */}</div>;
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Admin Details</h4>
                <h6>Contact Admin Details</h6>
              </div>
            </div>
          </div>
          
          <div className="admin-cards-container">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <div className="admin-cards-grid">
                {usersData.map((admin) => (
                  <div key={admin.id} className="id-card">
                    <div className="card-header">
                      <div className="company-logo">
                        <img src="/assets/img/logo.png" alt="Liceria Company" />
                      </div>
                    </div>
                    <div className="profile-section">
                      <div className="profile-image">
                        <div className="avatar-circle">
                          {admin.username.charAt(0)}
                        </div>
                      </div>
                      <h2 className="admin-name">{admin.username}</h2>
                      <div className="role-badge">
                        {admin.userRoleDto?.userRole || "MANAGER"}
                      </div>
                    </div>
                    <div className="contact-info">
                      <div className="info-item">{admin.mobileNumber}</div>
                      <div className="info-item">{admin.email}</div>
                    </div>
                    <div className="diagonal-shapes">
                      <div className="diagonal-top"></div>
                      <div className="diagonal-bottom"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="admin-pagination">
              {pagination.current > 1 && (
                <button 
                  onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
                >
                  Previous
                </button>
              )}
              {(pagination.current * pagination.pageSize) < pagination.total && (
                <button 
                  onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
                >
                  Next
                </button>
              )}
            </div>
          </div>

          <style>
            {`
              .admin-cards-container {
                padding: clamp(10px, 2vw, 20px);
                background: #f8f9fa;
                max-width: 1400px;
                margin: 0 auto;
                width: 100%;
                display: flex;
                justify-content: center;
              }

              .admin-cards-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
                max-width: 1000px;
                margin: 0 auto;
              }

              .id-card {
                position: relative;
                width: 300px;
                flex: 0 0 300px;
                aspect-ratio: 9/16;
                max-height: 380px;
                background: white;
                border-radius: clamp(8px, 1.5vw, 12px);
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              }

              .card-header {
                position: relative;
                z-index: 2;
                padding: clamp(8px, 1.5vw, 12px);
                text-align: center;
              }

              .company-logo {
                width: clamp(40px, 8vw, 50px);
                height: clamp(40px, 8vw, 50px);
                margin: 0 auto;
                background: white;
                border-radius: 50%;
                padding: clamp(6px, 1vw, 8px);
              }

              .company-logo img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }

              .profile-section {
                position: relative;
                z-index: 2;
                text-align: center;
                padding: clamp(8px, 1.5vw, 12px);
              }

              .profile-image {
                width: clamp(70px, 15vw, 90px);
                height: clamp(70px, 15vw, 90px);
                margin: 0 auto clamp(10px, 2vw, 15px);
                border-radius: 50%;
                border: 2px solid #8F4DAE;
                overflow: hidden;
              }

              .avatar-circle {
                width: 100%;
                height: 100%;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: clamp(24px, 5vw, 32px);
                font-weight: bold;
                color: #333;
              }

              .admin-name {
                font-size: clamp(14px, 2.5vw, 18px);
                font-weight: bold;
                color: #333;
                margin: clamp(6px, 1vw, 8px) 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0 10px;
              }

              .role-badge {
                background: white;
                color: #333;
                padding: clamp(3px, 0.8vw, 4px) clamp(10px, 2vw, 15px);
                border-radius: 4px;
                display: inline-block;
                font-weight: 600;
                font-size: clamp(10px, 1.8vw, 12px);
                margin: clamp(6px, 1vw, 8px) 0;
                position: relative;
                z-index: 2;
              }

              .contact-info {
                position: relative;
                z-index: 2;
                padding: clamp(8px, 1.5vw, 12px);
                text-align: center;
                color: white;
                margin-top: clamp(10px, 2vw, 15px);
              }

              .info-item {
                margin: clamp(8px, 1.5vw, 10px) 0;
                font-size: clamp(10px, 1.8vw, 12px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0 10px;
              }

              .diagonal-shapes {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
              }

              .diagonal-top {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 60%;
                background: #8F4DAE;
                clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
              }

              .diagonal-bottom {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 45%;
                background: #1a1a1a;
                clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
              }

              .admin-pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: clamp(10px, 2vw, 15px);
                margin-top: clamp(20px, 4vw, 30px);
                flex-wrap: wrap;
              }

              .admin-pagination button {
                padding: clamp(6px, 1.2vw, 8px) clamp(12px, 2.4vw, 16px);
                border: none;
                background: #FFA500;
                color: white;
                border-radius: clamp(15px, 3vw, 20px);
                cursor: pointer;
                font-weight: 500;
                font-size: clamp(12px, 2vw, 14px);
                transition: transform 0.2s ease;
                white-space: nowrap;
              }

              .admin-pagination button:hover:not(:disabled) {
                transform: scale(1.05);
              }

              .admin-pagination button:disabled {
                background: #ccc;
                cursor: not-allowed;
              }

              .loading-spinner {
                text-align: center;
                padding: clamp(20px, 4vw, 40px);
                font-size: clamp(14px, 2.5vw, 18px);
                color: #666;
              }

              /* Media queries for responsive layout */
              @media screen and (max-width: 992px) {
                .admin-cards-grid {
                  grid-template-columns: repeat(2, 300px);
                }
              }

              @media screen and (max-width: 650px) {
                .admin-cards-grid {
                  grid-template-columns: 300px;
                }
              }

              /* Handle text overflow for different screen sizes */
              @media screen and (max-width: 360px) {
                .admin-name, .info-item {
                  font-size: 90%;
                  padding: 0 5px;
                }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;
