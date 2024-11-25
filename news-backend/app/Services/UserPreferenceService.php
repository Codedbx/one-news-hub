<?php

namespace App\Services;

use App\Repositories\UserPreferenceRepository;

class UserPreferenceService
{
    private $userPreferenceRepository;

    public function __construct(UserPreferenceRepository $userPreferenceRepository)
    {
        $this->userPreferenceRepository = $userPreferenceRepository;
    }

    public function getUserPreferences(int $userId): array
    {
        return $this->userPreferenceRepository->getUserPreferences($userId);
    }

    public function saveUserPreferences(int $userId, array $preferences): bool
    {
        return $this->userPreferenceRepository->saveUserPreferences($userId, $preferences);
    }

    public function deleteUserPreferences(int $userId): bool
    {
        return $this->userPreferenceRepository->deleteUserPreferences($userId);
    }
}