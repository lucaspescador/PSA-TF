package com.psa.matriculas2022.model;

import com.psa.matriculas2022.constants.UserRoles;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class AuthToken {
    @NonNull
    private String token;

    @NonNull
    private String username;

    @NonNull
    private UserRoles role;
}

