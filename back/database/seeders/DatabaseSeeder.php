<?php

namespace Database\Seeders;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $permission = Permission::create(['name' => 'admin']);
        $roleAdmin = Role::create(['name' => 'administrator']);
        $roleAdmin->syncPermissions($permission);

        $permission = Permission::create(['name' => 'Update errors']);
        $role = Role::create(['name' => 'Supervisor']);
        $role->syncPermissions($permission);

        $permission = Permission::create(['name' => 'View errors']);
        $roleDev = Role::create(['name' => 'developer']);
        $roleDev->syncPermissions($permission);


        $userAdmin = User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('error404'),
            'id_rol' => 1
        ]);

        $userSuper = User::create([
            'name' => 'Supervisor',
            'email' => 'Supervisor@Supervisor.com',
            'password' => Hash::make('error404'),
            'id_rol' => 2
        ]);

        $userDev = User::create([
            'name' => 'dev',
            'email' => 'dev@dev.com',
            'password' => Hash::make('error404'),
            'id_rol' => 3
        ]);

    }
}
