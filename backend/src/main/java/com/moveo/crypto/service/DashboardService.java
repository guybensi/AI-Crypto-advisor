package com.moveo.crypto.service;

import com.moveo.crypto.dto.DashboardDtos;
import com.moveo.crypto.domain.User;

public interface DashboardService {
    DashboardDtos.DashboardResponse getDailyDashboard(User user);
}
