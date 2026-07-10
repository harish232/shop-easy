const API_URL = 'http://localhost:3000';

async function getAdminToken() {
  return localStorage.getItem('shopease_admin_token');
}

function showDashboard() {
  document.getElementById('admin-login-screen').classList.add('hidden');
  document.getElementById('admin-dashboard').classList.remove('hidden');
}

function logoutAdmin() {
  localStorage.removeItem('shopease_admin_token');
  document.getElementById('admin-login-screen').classList.remove('hidden');
  document.getElementById('admin-dashboard').classList.add('hidden');
}

async function handleAdminLogin(event) {
  if (event) event.preventDefault();
  const secret = document.getElementById('admin-secret').value.trim();
  if (!secret) return;

  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret })
  });
  const data = await res.json();
  if (!res.ok) {
    alert(data.message || 'Invalid admin secret');
    return;
  }

  localStorage.setItem('shopease_admin_token', data.token);
  showDashboard();
  await renderAdminDashboard();
}

async function fetchAdminData() {
  const token = await getAdminToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}/admin/stats`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    localStorage.removeItem('shopease_admin_token');
    return null;
  }
  return res.json();
}

async function renderAdminDashboard() {
  const data = await fetchAdminData();
  if (!data) return;

  showDashboard();
  document.getElementById('stat-users').querySelector('.admin-stat').textContent = data.users;
  document.getElementById('stat-orders').querySelector('.admin-stat').textContent = data.orders;
  document.getElementById('stat-sales').querySelector('.admin-stat').textContent = `₹${data.sales.toLocaleString()}`;
  document.getElementById('stat-pending').querySelector('.admin-stat').textContent = data.pendingReturns;

  const ordersBody = document.querySelector('#orders-table tbody');
  ordersBody.innerHTML = data.recentOrders.map(o => `
    <tr>
      <td>#${o.id}</td>
      <td>${o.email}</td>
      <td>${o.status}</td>
      <td>₹${o.total.toLocaleString()}</td>
      <td><button class="table-action-btn" onclick="updateOrderStatus('${o.id}', '${o.status === 'return requested' ? 'confirmed' : 'return requested'}')">${o.status === 'return requested' ? 'Mark Confirmed' : 'Request Return'}</button></td>
    </tr>
  `).join('');

  const usersBody = document.querySelector('#users-table tbody');
  usersBody.innerHTML = data.usersList.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${new Date(u.created_at).toLocaleDateString()}</td>
    </tr>
  `).join('');
}

function toggleAdminPassword() {
  const passwordInput = document.getElementById('admin-secret');
  const toggleButton = document.querySelector('.password-toggle-btn i');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.classList.remove('fa-eye');
    toggleButton.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleButton.classList.remove('fa-eye-slash');
    toggleButton.classList.add('fa-eye');
  }
}

async function updateOrderStatus(orderId, nextStatus) {
  const token = await getAdminToken();
  if (!token) return;

  const res = await fetch(`${API_URL}/admin/order/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status: nextStatus })
  });

  if (!res.ok) {
    alert('Unable to update order status');
    return;
  }

  await renderAdminDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleAdminLogin);
  }
});

(async () => {
  const token = await getAdminToken();
  if (token) {
    await renderAdminDashboard();
  }
})();
