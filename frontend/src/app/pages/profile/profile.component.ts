import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { IUserProfile } from '../../interfaces/iuser-profile.interface';
import { IOrder } from '../../interfaces/iorder.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private ordersService = inject(OrdersService);
  private router = inject(Router);

  user = signal<IUserProfile | null>(null);
  orders = signal<IOrder[]>([]);
  loading = signal<boolean>(true);
  isEditing = signal<boolean>(false);
  saving = signal<boolean>(false);

  editForm = signal<Partial<IUserProfile>>({});

  activateTab = signal<'datos' | 'pedidos'>('datos');

  initials = computed(() => {
    const name = this.user()?.name?.trim() || '';
     const surname = this.user()?.surname?.trim() || '';

    if (!name && !surname) return 'HV';
    
    const firstLetterName = name ? name[0] : '';
    const firstLetterSurname = surname ? surname[0] : '';

    return (firstLetterName + firstLetterSurname).toUpperCase();
  });

  totalGastado = computed(() => {
    return this.orders().reduce((acc, order) => acc + Number(order.total || 0), 0);
  });

  pedidosEntregados = computed(() => {
    return this.orders().filter(o => o.status?.toLowerCase() === 'entregado').length;
  });

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {

    try {
      const [response, orders] = await Promise.all([
        this.authService.getProfile(),
        this.ordersService.getAll()
      ])

      this.user.set(response.user);
      this.orders.set(orders);

    } catch (error) {
      console.error('Error al obtener la información del perfil:', error);
    } finally {
      // Se ejecuta SIEMPRE (haya error o no) para ocultar el estado de carga
      this.loading.set(false);
    }
  }

  toggleEdit () {
    if(!this.isEditing()) {
      this.editForm.set({ ...this.user() })
    }
    this.isEditing.set(!this.isEditing());
  }

  async onSaveProfile() {
    this.saving.set(true);
    try {
      // Enviamos la actualización al backend
      await this.authService.updateProfile(this.editForm());

      // Volvemos a pedir los datos actualizados
      const res = await this.authService.getProfile();
      this.user.set(res.user);

      //cerramos la edición
      this.isEditing.set(false);

    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }finally {
      this.saving.set(false);
    }

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
