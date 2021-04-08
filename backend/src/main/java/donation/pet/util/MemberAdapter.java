package donation.pet.util;

import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class MemberAdapter extends org.springframework.security.core.userdetails.User {

    private final Member member;

    public MemberAdapter(Member member) {
        super(member.getEmail(), member.getPassword(), authorities(member.getRoles()));
        this.member = member;
    }

    private static Collection<? extends GrantedAuthority> authorities(Set<MemberRole> roles) {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority("ROLE_" + r.name()))
                .collect(Collectors.toSet());
    }

    public Member getMember() { return member; }
}
