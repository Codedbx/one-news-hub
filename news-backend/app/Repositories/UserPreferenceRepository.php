<?php

namespace App\Repositories;

use App\Models\UserPreference;
use App\Repositories\Interfaces\UserPreferenceRepositoryInterface;

class UserPreferenceRepository implements UserPreferenceRepositoryInterface
{
    public function getUserPreferences(int $userId): array
    {
        $preferences = UserPreference::where('user_id', $userId)->first();

        // Return an empty array if no preferences are found
        return $preferences ? $preferences->toArray() : [];
    }

    public function saveUserPreferences(int $userId, array $preferences): bool
    {
        $pref =  UserPreference::updateOrCreate(
            ['user_id' => $userId],
            [
                'sources' => $preferences['sources'] ?? null,
                'categories' => $preferences['categories'] ?? null,
                'authors' => $preferences['authors'] ?? null,
            ]
        );

        if($pref){
            return true;
        } 
        return false;
    }

    public function deleteUserPreferences(int $userId): bool
    {
        return UserPreference::where('user_id', $userId)->delete();
    }
}